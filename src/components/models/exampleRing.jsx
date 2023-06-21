/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useMemo } from "react";
import { useGLTF, Caustics, MeshRefractionMaterial, useCubeTexture } from "@react-three/drei";
import { useControls } from 'leva'
import { RGBELoader } from 'three-stdlib'
import { useLoader } from "@react-three/fiber";


export default function ExampleRing(props) {
    const { nodes, materials } = useGLTF("/ring-random.glb");
    const diamondTexture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')

    // Ring Enviroment Map

    const envMap = useCubeTexture(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"], { path: "env2/" })

    // Diamond Controls
    const diamondConfig = useMemo(() => {
        return {
            bounces: { value: 3, min: 0, max: 8, step: 1 },
            aberrationStrength: { value: 0.01, min: 0.01, max: 0.1, step: 0.01 },
            ior: { value: 2.75, min: 0, max: 10 },
            fresnel: { value: 1, min: 0, max: 1 },
            color: '#56ccff',
            // fastChroma: false
        }
    }, [])

    // Ring Controls
    /**
     * Mesh Basic Material
     */
    const ringConfig = useMemo(() => {
        return {
            x: { value: 0, min: -6, max: 6, step: .1 },
            y: { value: 0, min: -6, max: 6, step: .1 },
            z: { value: 0, min: 0, max: 6, step: .1 },
            // color: "#d4af37",
            // reflectivity: { value: 0.5, min: 0, max: 1, step: .1 }
        }
    }, [])
    const diamondControls = useControls("Kryształy", diamondConfig)
    const ringControls = useControls("Pierścionek", ringConfig)

    // /**
    //  * Mesh Standard Material
    //  */
    const { metalness, roughness, color, envId } = useControls("Kolor Pierścionka", {
        metalness: { value: 1, min: 0, max: 2, step: .01 },
        roughness: { value: 0.08, min: 0, max: 1, step: .01 },
        color: "white",
    });

    const ref = useRef()
    console.log(ref)
    return (
        <group {...props} dispose={null}>
            <mesh
                ref={ref}
                {...ringConfig}
                name="Ring"
                castShadow
                receiveShadow
                geometry={nodes.Ring.geometry}
                // material={materials["White Gold"]}
                position={[ringControls.x, ringControls.y, ringControls.z]}
            >
                {/* <meshBasicMaterial color={ringConfig.color} envMap={envTexture} reflectivity={0.5} /> */}
                <meshPhysicalMaterial metalness={metalness} envMap={envMap} roughness={roughness} color={color} />
                <mesh
                    name="Diamond_Holder"
                    castShadow
                    receiveShadow
                    geometry={nodes.Diamond_Holder.geometry}
                // material={materials["White Gold"]}
                >
                    {/* <meshBasicMaterial color={ringConfig.color} envMap={envTexture} reflectivity={0.5} /> */}
                    <meshPhysicalMaterial metalness={metalness} envMap={envMap} roughness={roughness} color={color} />
                </mesh>
                <mesh
                    name="Diamonds"
                    // castShadow
                    // receiveShadow
                    geometry={nodes.Diamonds.geometry}
                // material={materials.Diamond}
                >
                    <MeshRefractionMaterial envMap={diamondTexture} {...diamondControls} fastChroma={false} toneMapped={false} />
                </mesh>
            </mesh>
        </group>
    );
}

useGLTF.preload("/ring-random.glb");
