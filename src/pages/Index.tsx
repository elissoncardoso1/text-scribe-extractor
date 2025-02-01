import { useState } from "react";
import { motion } from "framer-motion";
import ConversionDialog from "@/components/ConversionDialog";
import BatchConversionDialog from "@/components/BatchConversionDialog";
import AnimatedButton from "@/components/ui/animated-button";
import { Files } from "lucide-react";

const Index = () => {
  const [singleDialogOpen, setSingleDialogOpen] = useState(false);
  const [batchDialogOpen, setBatchDialogOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
    >
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-gray-900"
        >
          Converta PDF para{" "}
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex items-center">
              <div 
                className="w-6 h-6" 
                style={{
                  backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAIABJREFUeJzt3XmcXlVh//Hvuc8yeyaTlQQIWWaSQIAQEgSkIiiIpdZiiywV2+KSNNAK6q+g2FqqlYILWhoXwBWr/gpUFkWtqIhWEU3CErKvJBEy2ZPZn+We3x8h/lhCMvPMfZ5z7z2f93+8eGXmO3fm3vN97j3nXAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkGDGdQBUz5YtWxr2hGG96xyAjwo7SuG8edP2uc4BvBoKQMJZa4NVG7bOMoHOldFpspohabKk0ZICt+kAf+3e360de/bbXJDpra/L/SRTr/e/fvbsja5zAQdRABJq1Ybfz7Am/Bsj/aWkSa7zAHip3fu71blz7x/+O5MJwubm+lveMG/2DQ5jAX9AAUiYFZueOzVjyx+x0kXiEz4QWy8vAJJkjDSiqfGLbzh99lWOYgF/QAFIiJVbt44OivYmK71HDPxA7B2qABw0urX5fWfPO+k/ahwJeAkGkgRYtWnruaZon7bSfPE7AxJvb3fv536yZNnJrnPAbwwmMbdy49YPy9qfSJroOguAaJTLYVDs639k8eLFOddZ4C8KQExZa83qDVs/bWRvEr8nIHX6B0qj9pWyD7nOAX8xsMTU6k1bP2uN/aDrHACqp6u3//xHFy/nPIcTFIAYWrVh8z9JusZ1DgDVZa3V/u7uW3722+WzXGeBfygAMbNy4+YLZMyNrnMAqI1SOcwMFPp+uXz58rzrLPALBSBGlm3YMN7I3CV+L4BX+geKbdu6it93nQN+YaCJkazJflLSONc5ANQe8wFQaxSAmFi5aeuZRuadrnMAcIP5AKg1CkBMGGs/KnZmBLzGfADUEgUgBlZv2Dpb0gWucwBwj/kAqBUKQBwE9j3i0z+AFzAfALVAAXBs8eLFOWt1qescAOKD+QCoBQqAYy1tY0+XNNZ1DgDxwnwAVBsFwDFrzDmuMwCIJ+YDoJooAI6ZwJzuOgOA+Orq7T//kd89c63rHEgfCoBj1mqG6wwA4staq66ens/8ZMmyk11nQbpQAByy1gaSJrvOASDeyuUwKPb1P7J48eKc6yxIDwqAQ+vWrWuWxAkN4Ij6B0qj9pWyD7nOgfSgADhUrqtrdp0BQHIwHwBRogA4FJayfPoHMGjMB0CUKAAAkCAH5gMM/Jz9ATBcFAAASBj2B0AUKAAAkEC8LwDDRQEAgASy1mpfd/cnmQ+ASlEAACChmA+A4aAAAECCMR8AlaIAAEDCMR8AlaAAAEDCMR8AlaAAAEAKMB8AQ0UBAICUYD4AhoICAAApwnwADBYFAABShPkAGCwKAACkDPMBMBgUAABIIeYD4EgoAACQUswHwOFQAAAgpZgPgMOhAABAijEfAK+GAgAAKcd8ABwKBQAAPMB8ALwcBQAAPMB8ALwcBQAAPMF8ALwYBQAAPMJ8ABxEAQAAzzAfABIFAAC8w3wASBQAAPAS8wFAAQAATzEfwG8UAADwGPMB/EUBAACPMR/AXxQAAPBcuRwGpb7iI488YrOus6B2KAAAAPUNDIwKG596yHUO1A4FAAAgSerq6X8T8wH8QQEAAEhiPoBvKAAAgD9gPoA/KAAAgJdgPoAfKAAAgFdgPkD6UQAAAK/AfID0owAAAA6J+QDpRgEAALwq5gOkFwUAAHBYzAdIJwoAAOCwmA+QThQAAMARMR8gfSgAAIBBYT5AulAAAACDxnyA9KAAAAAGjfkA6UEBAAAMCfMB0oECAAAYMuYDJB8FAABQEeYDJBsFAABQEeYDJBsFAABQMeYDJBcFAAAwLMwHSCYKAABg2JgPkDwUAADAsDEfIHkoAACASDAfIFkoAACAyDAfIDkoAABQBcZ1AIf2d/e/6ZeLV1zjOgcOjwIAAFVgjM8VwGpPd9etzAeINwoAAFRB4HUBYD5AElAAAKAKMpmM6wjOMR8g3igAAFAF+RwffCX2B4gzCgAAVEE2k5EJ/H4MIB3YH2B/d88tP3vyyVmus+ClKAAAUAXGSI11edcxYqFULmcK3eEvmA8QLxQAAKiSpvo61xFig/kA8UMBAIAqaWludB0hVpgPEC8UAACoknwuq/p8znWM2OB9AfFCAQCAKmprbXYdIVbYHyA+KAAAUEWtLU3KZhnrXoz5APFAAQCAKjKSxra1uI4RO7wvwD0KAABUWWtzkxpYEvgyvC/ANQoAAFSZMdKEsW3evx/g5crlMCj3F37GfAA3KAAAUAN1+ZzGj251HSN2evsLo5kP4AZ11KEVG547LjDlTa5zxFFfb686O7epp7vHdRS8ilw+p7a2URozdqznr74dmm0792jPfv6uX8poTOuIa18374R/d53EJ5y1DlEAXmpgYED/9e3/1H333qPVq1YqDEPXkTAIbW2jdM4b36h3vXeBOqbPcB0n9qy1em77Hu3v6XUdJVaymUy5aWR+9htOOWW56yy+oAA4RAH4/1atXKH3LVygzc9uch0FFcpkslr4d3+vq695P3cEjsBaq86de7WnizsBL9ZQV7e7rjhn/LnnmpLrLD5gDgCcW7liua645C8Y/BOuXC5p0b9/Vh//5390HSX2jDE6amybxrSNoCy9CPsD1BYFAE719/frmqsWqLu723UUROTb37xLDz34gOsYiTC2bYQmHTVG2WzGdZTY2N/d96ZHl6y41HUOH1AA4NR3vnmXNj/7rOsYiNinb75J5RJ3cQejsaFO044dr1GtzTyTfUFfX98i1xl8QAGAU/9973+5joAqeP755/TrX/2v6xiJEZhA40eP1LRJE9Q2osn7/QL6BgpjfrPk6bmuc6QdBQDO7Nu7V+vXrnUdA1WyZPFvXUdInFw2o6PGtKnjuAk6amybGhvq5GsX6At1hesMacfuS3Bmx/btsta6joEq2d7Z6TpCYgVBoLaWJrW1NMmGVr0DAxoYKGmgWFSxVJa1VqFN9zLZTGBGu86QdhQAOJNnb/RUq6urcx0hFUxg1NRQr6YG10lqy0grXGdIOx4BwJmjJkxkkEix4yZPcR0BwGFQAOBMPp/X6We+1nUMVMkfnX2O6wgADoMCAKf++l3vcR0BVXDW685We0eH6xgADoMCAKfOet3Z+pM/favrGIhQU1Oz/vHGj7mOAeAIKABw7hO3fFqvOeNM1zEQgYbGRv37F76kKVOnuY4C4AgoAHCuvqFBX7nrW5q/8GrlcjnXcVChE086Wd+59z790dmvdx0FwCB4usVEPPA2wFfasX27vv/A/Vqy+LfasWOHSqWi60g4jJaWEeqYPkNvOO98nfHas3ixDSJjpA/PmHLsza5zpBlnq0MUAAA4NApA9fEIAAAAD1EAAADwEAUAAAAPUQAAAPAQBQAAAA9RAAAA8BAFAAAAD1EAAADwEAUAAAAPUQAAAPAQBQAAAA9RAAAA8BAFAAAAD1EAAADwEAUAAAAPUQAAAPAQBQAAAA9RAAAA8BAFAAAAD1EAAADwEAUAAAAPUQAAAPAQBQAAAA9RAAAA8BAFAAAAD1EAAADwEAUAAAAPUQAAAPAQBQAAAA9RAAAA8FDWdQDgUHbu2KHtndtkreskQPU0NTfp2EnHKZPJuI4CD1EAEBs9Pd36xle/ou/e81/aumWL6zhATTQ1NeuN579J7114lTqmz3AdBx7hEQBi4cmlS3Theefqtls/zeAPr/T0dOvB+7+riy58s7606D9kue2FGuEOAJx7cukS/c07LlN/f7/rKIAz5XJJn/vMJ9XT060PXv9h13HgAe4AwKne3h5de/VCBn/gBXd+6Qv6xc8fcR0DHqAAwKlvfu2r2rbtedcxgFj59M03uY4AD1AA4NR9/32v6whA7KxZvUrLly1zHQMpRwGAM3v27NamjRtcxwBi6cknlriOgJSjAMCZnTt2uI4AxNb27dtdR0DKUQDgTF1dvesIQGw11De4joCUowDAmYlHH636Bi5ywKFMnTbNdQSkHAUAzmSzWb32rD9yHQOInbq6Op1+5mtdx0DKUQDg1JXvme86AhA7b7v4ErWOHOk6BlKOAgCnTjv9DF186WWuYwCxMWHCRF37wX9wHQMeoADAuY9+7BM65w3nuY4BODd23Djd/rVvaGRbm+so8AAFAM7l83l9/o4v6wPXfUiNjU2u4wBOnH/Bm3XvAw9p+oyZrqPAE8Z1AJ+t2PDccYEpb3KdI07279+v//nhQ1q6+HfasX27wnLoOhJQNS0jRmjmCSfo/Av+WO0dHa7jxIqRPjxjyrE3u86RZhQAhygAAHBoFIDq4xEAAAAeogAAAOAhCgAAAB6iAAAA4CEKAAAAHqIAAADgIQoAAAAeogAAAOAhCgAAAB6iAAAA4CEKAAAAHqIAAADgIQoAAAAeogAAAOAhCgAAAB6iAAAA4CEKAAAAHqIAAADgIQoAAAAeogAAAOAhCgAAAB6iAAAA4CEKAAAAHqIAAADgIQoAAAAeogAAAOAhCgAAAB6iAAAA4CEKAAAAHqIAAADgoazrAMDLhWGoTRs3aHtnp0Ibuo4DVE1Lywi1t3eoobHRdRR4iAKA2Ni9e5fu/OLndd9/36u9e/a4jgPURCaT1etef44WXHW15syd5zoOPMIjAMTCr375C/3xG8/R1758J4M/vFIul/Tzn/1Ef/n2P9cnb/pXhSF3vVAb3AGAc4/96n+14F1/rVKp5DoK4Iy1Vl+983b19fXqnz9+k+s48AB3AOBUV1eXrvvANQz+wAu+85/f1MM/+qHrGPAABQBOff3Ld2jH9u2uYwCxcuunbpG11nUMpBwFAE49eP93XUcAYmfjhvV6+qknXcdAylEA4MyuXTu1ZfNm1zGAWHrqiaWuIyDlKABwZtfOna4jALG1a9cu1xGQchQAONPQwOYnwKtpqG9wHQEpRwGAMxMnTlRTU7PrGEAstU+f7joCUo4CAGcy2QM7oAF4qYbGRp1+5mtdx0DKUQDg1JXvna8g4M8QeLFLL3+HWlpaXMdAynHlhVOzT5mjK/76StcxgNg4bvIU/d21H3AdAx6gAMC562/4R73lzy5yHQNw7thJk3Tn1+9SczNzY1B9FAA4l8lm9anP3qYb//UmtbWNch0HqLlMJqM/f/sluuf+72vScZNdx4EnjOsAcTP+nZ9qamqon2qNaQuDoCmQqlbFj584qvnWK876arW+fhINDAzokZ8+rCeXLtX2zm0KQ7ZDRXq1tLRo5gkn6A3nv0kTJkx0HSdWjPThGVOOvdl1jjTz/m2Ak//2i5ON9BZJr5fs6ZKOPTjkBFUee9Y+v/f31f0OyVNXV6c3X/gWvfnCt7iOAgCp5mUBmPX2u/M9Y3ZebqT3yNqz5OpOiDHcgQEAOOFXAXj73Zmpo3fN79XODxurY13HMZZHMAAAN7wpAJPnLzrdmJ1fstIprrMcZIylAAAAnPBgFYA1kxd8/hoTBL+Uic/gL0kyxoPjDwCIo1TfAZj8N1+rD+q/8G0r8zbXWQ4lCCgAAAA3UlsAZrzrKy2FfN+DVuYc11leTcAdAACAI6kcgObOvz1XyA/cI+kc11kOJzDKuM4AAPBTKgvAblNeJOkC1zmOhDsAAABXUjcATV6w6M9kNN91jsHImCC1j2AAAPGWqgIwff7tY4wJ7nSdY7CCIL1zMAAA8ZaqAlAMSv8saazrHIMVBIY5AAAAJ1JTAKZd9fl2ySxwnWMojJgDAABwIzUDkA31fyTlXOcAACAJUlEAjnn3l0dZY65wnQMAgKRIRQHIZQvvkFWT6xwAACRFKgqAjL3cdQQAAJIk8QVg8lWfP0oyZ7jOAQBAkiS+AARlnSuJ1+oCADAEiS8AoTGvc50BAICkSXwBMNKJrjMAAJA0iS8Akma4DgAAQNIkvABYI2m06xQAACRNogvA+Hd+ulES++kDADBEiS4Ax0/rGZBkXecAACBpEl0Afn7jjSUZ9brOAQBA0iS6AMhaI6tdrmMAAJA0iS4Ac+/YMCLTNLLVdQ4AAJIm0QVAkoKmVgoAAABDlPgCkGlk/AcAYKiSXwBaRkuGVwEAADAUiS8AJpNVpmmk6xgAACRK4guAJOVGH+06AgAAiZKKApAdOV4mm3cdAwCAxEhFAZAJlB87yXUKAAASIx0FQFJ23CSZXL3rGAAAJEJqCoAxGdVN7HAdAwCAREhNAZCkbNtRyo4c7zoGAACxl6oCIEl1xx6voK7RdQwAAGItdQXAZHKqn3qKTCbnOgoAALGVugIgSUFdk+rb58pks66jAAAQS6ksAJKUaWhRw7R5rAwAAOAQUlsAJCloaFFjx2m8MAgAgJdJdQGQJJOvV0PHacqNnyKJlwYBACB5UAAkScaobkK7Gmeerkxzm+s0L2JdBwAAeMqPAvCCoL5FDe3z1DDt1AOvEXZ8R6AU2oLTAAAAb3k5TT7TMloNLaMVFvpV2vO8yl27VO7ZK9nafiIvlMp9kniLEQCg5rwsAAcF+Xrlx0+Rxk+RwrLKfd2yAz0KC72y5VAKy9F/Uxt221Kh04bhPlOX671vQ3l0fUYTchmNjP6bAUCylK36+su2c+1eTTrp9nXzK/06NrR9gWyvTGavCbQla/dsXLJgXjHKrEmX6Flxc29f31qw4V7XOQAAsVeSsStMGPw8VPiwHV388fJLZnn9GJYCAADw0W5J3wnL5nPLr25f5zqMC15NAgQA4AWjJF0dZOyqE29f852T71w1xXWgWqMAAAB8ljHWXGbLmeUn3b7mn8658RFv5sZRAAAAkBpkzcd2jT/61yd9Yc1U12FqgQIAAMBBxpxmA/P47C+ufo3rKNVGAQAA4EWMNCY0wU9PumPNea6zVBMFAACAV2pWaB448Y51r3UdpFooAAAAHFqjQvvAKV9cOdl1kGqgAAAA8CqMNKaszN2z7l6eum3bKQAAAByOMacFu/MfcR0jahQAAACO7PrZd6yf7jpElCgAAAAcWV3Zhje5DhElCgAAAINgrP589h1rZ7nOERUKAAAAg2PKZV3rOkRUKAAAAAySMbrkzFu3NLjOEQUKAAAAgzeip6HvQtchokABAABgCGwQnO86QxQoAAAADIW157qOEAUKAAAAQ9Mx6/PLm12HGC4KAAAAQ2OyQb7DdYjhogAAADBEYWCOc51huCgAAAAMkQ1ti+sMw0UBAABgiIJAzAEAAMA3NjQZ1xmGiwIAAICHKAAAAHiIAgAAgIcoAAAAeIgCAACAhygAAAB4iAIAAICHKAAAAHiIAgAAgIcoAAAAeIgCAACAhygAAAB4iAIAAICHKAAAAHgo6zoA4qUxK00fGaitzihjXKeprb6y9FyP1ab9oWzEX7s1L3WMDDQybzQQSlu7rZ7tChVG/Y0SZky90eQRRiPzRoWytKEr1HM9NvLjMrrOaErrge/jm66i1bNdVtt6Pf9jwytQACBJmtBodPn0rE4bl1HWv2vkS+zpt/resyX9aHNZxXB4X2tqq9Gl03KaMzbQyw/rzn6r728q64ebywqtXxfnmSONLp+e0/Ftrzwu23qtHthY0k+3loddxE4cFejS9qxmHOL7+ObZLqt71pf0eGfZdRTERKLPibm3r28t2HCv6xxJd9aEQFfNyiufcZ0kXtbtC/XJJ4raM1DZMHThcVn91YzsEe+krN0X6t+WFNVV9KMEXNqR1V9MzR7x4vPkzlC3PllUX3noxyUw0uUdWV00hc84L/foc2Xdvrw47HLrPWv+ftnC9kWuYwwHcwA8N2dMoPedxOB/KO2tgT46L6fGCsaQCyZldOXMIw/+ktTRGuhjr8mrKTf075M075ie1cWDGPwl6ZQxga4/NVfRHanLGPxf1esnZvS+k3PJ/vSHSFAAPNaSN7pmdl4BV4JXdUxzoHdMH9pAclSj0V/NGNpofkyz0XVz8sql+Iw875jMkAflWaMC/enkof2bE9oCBv8jOGN8RmdPpPX7LsWXGxzJnx6XURPXySM67+iMxtQPviVdPC2rfAVn1gltga4+MZ2fzOaNC/TeEyq7xXHR1OyQ7lBd0j64OwxuxOcxT7yPE2qBAuCxM4/iE8BgBIHRa8YP7lhljXT6+MpPq7MmZHT5EO84xF37CKNrT85VfKepMSvNGTu44z+yTjq+Lc6XNaO4lIBxDUbTWuN8rFBt/PY91Zg9cKsagzN1xOCO1YQmo/phrp9825Ss3jwpHeVsXIPRh+bWqW6Yx2RKy+D+/ZSWIAGPtOITcOoIhgCf8dv3VIuH66GHo3WQxyuqRypXzshq7iA/9cZVc87oI3Nzas0P/2u1DPLpQUuOv+uhiOJ3g+SiAHiq25MlZ1HpKgzueA2UoxmAgsDo2tlZTW1N5oCWD6Tr5uQ0sSmaS0z/IJeu95Qi+Xbe8GXpKQ6NAuCpnqK0u5+Tf7C29AzuWG3tCVWIaH11fcboI3PziXtUYyQtODEX6bP4DfsHd1A3dyd0cbujU3FzF9cAn1EAPPbb7Qm9WNaYlfTbzsEdq2IoPbEjup3WRuSMrp+TS9QeAVfMyOrsCdE9viiUpad3DW6g2tFntXGQZSFWHHS8fQWrVXspAD6jAHjsvo0lFdgV9Ih+vS3U73sGP6jcv7Ec6V72xzQHidkj4IJJGb11iOv2j+THW0qDfgQjSfeu5znAYHx3vX9bUOOlEnBJQbXs7rf6yqqi6xixtmfA6q7VQztG6/aFemBjtINQEvYImDcu0LtmRnur4vc9ob6zbmjH8rfbQ/10K832cFbuCfXjLRQl31EAPPezrWV9e03J+7fSHcqOPquPLy5UNFfi/64r6fFBPjYYrLMmZHR5Rzz3CJjaOry1/ofSVbC6ZWmxortUX11Z1K+3UQIOZfnuA++4KHHOe48CAN23saSPLS5o/X6uCJJUstKPNpd1/W8K2tJd2TEJrXTbsoLW7I22BLxtavz2CBjXYHTDqcNf6/9ihVC65Yminq/wFbaFUPrcU0V9cXlRuyp8mVPadBWsvrm6qI8vLrAKCJJ4HTBesHx3qA89NqBjmo1mjQrUVmcG9SKboWrNG517dOUD2J4Bq0efq84nu76y1XPd0tO7yuqN4O5ooSzdvLSom86Idib/lTNz2tVv9bsYTOJszhndENFa/4MOlKeiVg+zPFkduMP189+XNWNkoKkjArXWVWe+3dQRgU4eXfnnqXX7Qj2zuz"
                }}
              ></div>
              <span className="text-sm ml-1">txt</span>
            </span>
            {" "}ou{" "}
            <span className="inline-flex items-center">
              <Files className="w-6 h-6 text-primary" />
              <span className="text-sm ml-1">docx</span>
            </span>
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-gray-600"
        >
          Transforme arquivos PDF em texto com facilidade
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <AnimatedButton
            onClick={() => setSingleDialogOpen(true)}
            size="lg"
            className="flex items-center gap-2"
          >
            <Files className="w-5 h-5" />
            Converter um arquivo
          </AnimatedButton>
          
          <AnimatedButton
            onClick={() => setBatchDialogOpen(true)}
            size="lg"
            variant="outline"
            className="flex items-center gap-2"
          >
            <Files className="w-5 h-5" />
            Conversão em massa
          </AnimatedButton>
        </motion.div>
      </div>

      <ConversionDialog
        open={singleDialogOpen}
        onOpenChange={setSingleDialogOpen}
        mode="single"
      />
      
      <BatchConversionDialog
        open={batchDialogOpen}
        onOpenChange={setBatchDialogOpen}
      />
    </motion.div>
  );
};

export default Index;